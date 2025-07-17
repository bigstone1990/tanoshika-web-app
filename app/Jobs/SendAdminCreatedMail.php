<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\AdminCreatedMail;

class SendAdminCreatedMail implements ShouldQueue
{
    use Queueable;

    public $admin;
    public $password;

    /**
     * Create a new job instance.
     */
    public function __construct($admin, $password)
    {
        $this->admin = $admin;
        $this->password = $password;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->admin)->send(new AdminCreatedMail($this->admin, $this->password));
    }
}
