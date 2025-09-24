package com.burgerManagement.restImpl;

import com.burgerManagement.Util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailRestController {

    @Autowired
    private EmailUtil emailUtil;

    @PostMapping("/send")
    public String sendEmail(
            @RequestParam("to") String to,
            @RequestParam("subject") String subject,
            @RequestParam("body") String body
    ) {
        emailUtil.sendEmail(to, subject, body);
        return "Email envoyé avec succès";
    }
}
