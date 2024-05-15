package ru.easyroadmap.website.docs.annotation;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface DescribeErrors {

    DescribeError[] value() default {};

}
