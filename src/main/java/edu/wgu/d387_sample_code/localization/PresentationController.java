package edu.wgu.d387_sample_code.localization;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PresentationController {

    private final TimeConverter timeConverter = new TimeConverter();

    @GetMapping("/presentation")
    public String getPresentationInfo() {
        // Get the presentation information with time conversions
        String presentationInfo = timeConverter.PresentationConversion();
        return presentationInfo;
    }
}