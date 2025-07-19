<?php

namespace App\Http\Controllers\Admin\Account\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Account\User\StoreUserRequest;
use App\Http\Requests\Admin\Account\User\UpdateUserRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
}
