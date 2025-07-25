<?php

namespace App\Http\Controllers\Admin\Account\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Account\User\StoreUserRequest;
use App\Http\Requests\Admin\Account\User\UpdateUserRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Exception;
use App\Jobs\SendUserCreatedMail;
use App\Exceptions\OptimisticLockException;

use App\Models\User;
use App\Models\Office;
use App\Enums\User\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::select('id', 'office_id', 'name', 'kana', 'email', 'role')
            ->with(['office:id,name'])
            ->orderBy('id')
            ->get();

        $groupedUsers = $users->groupBy('role');

        $staff = $groupedUsers->get(Role::STAFF->value, collect());
        $members = $groupedUsers->get(Role::MEMBER->value, collect());
        $others = $groupedUsers->get(null, collect());

        return Inertia::render('admin/account/user/index', [
            'staff' => $staff,
            'members' => $members,
            'others' => $others,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roles =  Role::options();

        $offices = Office::select('id', 'name')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/account/user/create', [
            'roles' => $roles,
            'offices' => $offices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        try {
            $password = Str::random(8);
            $user = null;

            DB::transaction(function () use ($request, &$user, $password) {
                $user = User::create([
                    'office_id' => intval($request->office) === 0 ? null : intval($request->office),
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'role' => intval($request->role) === 0 ? null : intval($request->role),
                    'can_manage_jobs' => $request->can_manage_jobs,
                    'can_manage_rules' => $request->can_manage_rules,
                    'can_manage_groupings' => $request->can_manage_groupings,
                    'creator_id' => Auth::guard('admin')->id(),
                    'creator_type' => get_class(Auth::guard('admin')->user()),
                    'updater_id' => Auth::guard('admin')->id(),
                    'updater_type' => get_class(Auth::guard('admin')->user()),
                ]);
            });

            SendUserCreatedMail::dispatch($user, $password);

            return to_route('admin.account.users.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '登録しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '登録に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        $user->load(['office', 'creator', 'updater']);

        return Inertia::render('admin/account/user/show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'kana' => $user->kana,
                'email' => $user->email,
                'role' => $user->role?->label() ?? '未設定',
                'office' => $user->office?->name ?? '未所属',
                'can_manage_jobs' => $user->can_manage_jobs,
                'can_manage_rules' => $user->can_manage_rules,
                'can_manage_groupings' => $user->can_manage_groupings,
                'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                'creator' => $user->creator->name,
                'updated_at'=> $user->updated_at->format('Y-m-d H:i:s'),
                'updater' => $user->updater->name,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        $roles =  Role::options();

        $offices = Office::select('id', 'name')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/account/user/edit', [
            'user' => [
                'id' => $user->id,
                'office_id' => $user->office_id,
                'name' => $user->name,
                'kana' => $user->kana,
                'email' => $user->email,
                'role' => $user->role,
                'can_manage_jobs' => $user->can_manage_jobs,
                'can_manage_rules' => $user->can_manage_rules,
                'can_manage_groupings' => $user->can_manage_groupings,
                'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
            ],
            'roles' => $roles,
            'offices' => $offices,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $user) {
                if ($user->updated_at->format('Y-m-d H:i:s') !== $request->updated_at) {
                    throw new OptimisticLockException;
                }

                $user->office_id = intval($request->office) === 0 ? null : intval($request->office);
                $user->name = $request->name;
                $user->kana = $request->kana;
                $user->role = intval($request->role) === 0 ? null : intval($request->role);
                $user->can_manage_jobs = $request->can_manage_jobs;
                $user->can_manage_rules = $request->can_manage_rules;
                $user->can_manage_groupings = $request->can_manage_groupings;
                $user->updater()->associate(Auth::guard('admin')->user());
                $user->save();
            });

            return to_route('admin.account.users.show', ['user' => $user->id])->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '更新しました',
                'flash_status' => 'success',
            ]);
        } catch (OptimisticLockException $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => $e->getMessage(),
                'flash_status' => 'error',
            ])->withInput();
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '更新に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            return to_route('admin.account.users.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '削除しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '削除に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:users,id',
        ], [
            'ids.required' => '削除対象を選択してください',
            'ids.array' => '削除対象の形式が正しくありません',
            'ids.*.integer' => '無効なIDが含まれています',
            'ids.*.exists' => '存在しないデータが選択されていたのでページを更新しました。再試行してください。',
        ]);

        try {
            DB::transaction(function () use ($request) {
                User::destroy($request->ids);
            });

            return to_route('admin.account.users.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => count($request->ids) . '件のデータを削除しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '一括削除に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }
}
