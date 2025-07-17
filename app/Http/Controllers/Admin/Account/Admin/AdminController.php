<?php

namespace App\Http\Controllers\Admin\Account\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Account\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\Account\Admin\UpdateAdminRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Exception;
use App\Jobs\SendAdminCreatedMail;
use App\Exceptions\OptimisticLockException;

use App\Models\Admin;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $admins = Admin::select('id', 'name', 'kana', 'email')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/account/admin/index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/account/admin/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request): RedirectResponse
    {
        try {
            $password = Str::random(8);
            $admin = null;

            DB::transaction(function () use ($request, &$admin, $password) {
                $admin = Admin::create([
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'creator_id' => Auth::guard('admin')->id(),
                    'updater_id' => Auth::guard('admin')->id(),
                ]);
            });

            SendAdminCreatedMail::dispatch($admin, $password);

            return to_route('admin.account.admins.index')->with([
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
    public function show(Admin $admin): Response
    {
        $admin->load(['creator', 'updater']);

        return Inertia::render('admin/account/admin/show', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'kana' => $admin->kana,
                'email' => $admin->email,
                'created_at' => $admin->created_at->format('Y-m-d H:i:s'),
                'creator' => $admin->creator->name,
                'updated_at'=> $admin->updated_at->format('Y-m-d H:i:s'),
                'updater' => $admin->updater->name,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin): Response
    {
        return Inertia::render('admin/account/admin/edit', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'kana' => $admin->kana,
                'email' => $admin->email,
                'updated_at' => $admin->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        try {
            DB::transaction(function () use ($request, $admin) {
                if ($admin->updated_at->format('Y-m-d H:i:s') !== $request->updated_at) {
                    throw new OptimisticLockException;
                }

                $admin->name = $request->name;
                $admin->kana = $request->kana;
                $admin->updater_id = Auth::guard('admin')->id();

                $admin->save();
            });

            return to_route('admin.account.admins.show', ['admin' => $admin->id])->with([
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
    public function destroy(string $id)
    {
        //
    }

    public function bulkDestroy(Request $request)
    {
        //
    }
}
