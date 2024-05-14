package ru.easyroadmap.website.docs.annotation;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface SuccessResponse {

    String value() default "ОК";

    boolean canBeEmpty() default false;

}
