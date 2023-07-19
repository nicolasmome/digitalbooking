package com.grupo9.digitalBooking.music.model.service;

import sendinblue.*;
import sendinblue.auth.ApiKeyAuth;
import sibApi.AccountApi;
import sibApi.TransactionalEmailsApi;
import sibModel.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;


public class MailService {

    public static void sendEmail() {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey("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");

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail("cristianvargas385@gmail.com");
        sender.setName("Christian Vargas");

        List<SendSmtpEmailTo> toList = new ArrayList<>();
        SendSmtpEmailTo to = new SendSmtpEmailTo();
        to.setEmail("Laura.salazar.cien@gmail.com");
        to.setName("Laura");

        toList.add(to);

        Properties headers = new Properties();
        headers.setProperty("Some-Custom-Name", "unique-id-1234");
        Properties params = new Properties();
        params.setProperty("parameter", "My param value");
        params.setProperty("subject", "New Subject");

        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(sender);
        sendSmtpEmail.setTo(toList);
        sendSmtpEmail.setHeaders(headers);
        sendSmtpEmail.setParams(params);

        sendSmtpEmail.setHtmlContent("<html>" +
                "<body>" +
                "<h2>Pruebas de email christian</h2>" +
                "<p>Hola " + to.getName() +"</p>" +
                "</body>" +
                "</html>");
        sendSmtpEmail.setSubject("Pruebas Christian api email");
        System.out.println(sendSmtpEmail);
        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TransactionalEmailsApi#sendTransacEmail");
            e.printStackTrace();
        }
    }

}
