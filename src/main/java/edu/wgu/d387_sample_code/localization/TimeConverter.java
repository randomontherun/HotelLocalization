package edu.wgu.d387_sample_code.localization;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class TimeConverter {

    public String PresentationConversion() {
        LocalDateTime localDateTime = LocalDateTime.of(2024, 3, 9, 12, 0); // March 9th, 2024 at 12:00 PM
        ZonedDateTime zonedDateTimeET = localDateTime.atZone(ZoneId.of("America/New_York")); // Eastern Time
        ZonedDateTime zonedDateTimeMT = zonedDateTimeET.withZoneSameInstant(ZoneId.of("America/Denver")); // Mountain Time
        ZonedDateTime zonedDateTimeUTC = zonedDateTimeET.withZoneSameInstant(ZoneId.of("UTC")); // UTC

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a");

        StringBuilder sb = new StringBuilder();
        sb.append("Join us for an online live presentation held at the Landon Hotel on ")
                .append(zonedDateTimeET.format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a")))
                .append(" Eastern Time, ")
                .append(zonedDateTimeMT.format(DateTimeFormatter.ofPattern("h:mm a")))
                .append(" Mountain Time, and ")
                .append(zonedDateTimeUTC.format(DateTimeFormatter.ofPattern("h:mm a")))
                .append(" UTC");

        return sb.toString();
    }
}