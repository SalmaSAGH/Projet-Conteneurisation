package com.nisanth.springbootreact.exception;

public class StudentAleadyExistsException extends RuntimeException {
    public StudentAleadyExistsException(String message)
    {
        super(message);
    }
}
