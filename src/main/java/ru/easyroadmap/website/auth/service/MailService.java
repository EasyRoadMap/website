package ru.easyroadmap.website.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public final class MailService {

    private final JavaMailSender mailSender;

    @Value("${server.mail.name}")
    private String senderName;
    @Value("${server.mail.address}")
    private String senderAddress;

    public void sendMail(String receiverAddress, String subject, String content) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(senderAddress, senderName);
        helper.setTo(receiverAddress);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

}
