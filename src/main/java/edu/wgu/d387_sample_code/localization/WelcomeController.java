package edu.wgu.d387_sample_code.localization;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class WelcomeController {

    private final MessageProvider messageProvider = new MessageProvider();

    @GetMapping("/welcome")
    public ArrayList<String> getWelcomeMessages() {
        return messageProvider.getWelcomeMessages();
    }
}
