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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
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
