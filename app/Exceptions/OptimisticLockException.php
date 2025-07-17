<?php

namespace App\Exceptions;

use Exception;

class OptimisticLockException extends Exception
{
    public function __construct($message = 'このデータは他のユーザーによって更新されています')
    {
        parent::__construct($message);
    }
}
