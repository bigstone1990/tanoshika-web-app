<?php

namespace App\Http\Controllers\Admin\Office;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Office\StoreOfficeRequest;
use App\Http\Requests\Admin\Office\UpdateOfficeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;
use App\Exceptions\OptimisticLockException;

use App\Models\Office;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $offices = Office::select('id', 'name', 'kana')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/office/index', [
            'offices' => $offices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/office/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                Office::create([
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'creator_id' => Auth::guard('admin')->id(),
                    'updater_id' => Auth::guard('admin')->id(),
                ]);
            });

            return to_route('admin.offices.index')->with([
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
    public function show(Office $office): Response
    {
        $office->load(['creator', 'updater']);

        return Inertia::render('admin/office/show', [
            'office' => [
                'id' => $office->id,
                'name' => $office->name,
                'kana' => $office->kana,
                'created_at' => $office->created_at->format('Y-m-d H:i:s'),
                'creator' => $office->creator->name,
                'updated_at'=> $office->updated_at->format('Y-m-d H:i:s'),
                'updater' => $office->updater->name,
            ],
        ]);
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
