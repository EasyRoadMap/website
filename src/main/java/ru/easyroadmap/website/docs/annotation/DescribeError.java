package ru.easyroadmap.website.docs.annotation;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(DescribeErrors.class)
public @interface DescribeError {

    String code();

    String userMessage() default "—";

    boolean forUser() default false;

    String payload() default "—";

}
