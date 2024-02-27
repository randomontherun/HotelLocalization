package edu.wgu.d387_sample_code.localization;


import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.io.InputStream;
import java.util.Properties;
import org.springframework.core.io.ClassPathResource;

public class MessageProvider {

    private static final ExecutorService messageExecutor = Executors.newFixedThreadPool(2);

    public ArrayList<String> getWelcomeMessages() {
        ArrayList<String> messages = new ArrayList<>();
        CountDownLatch latch = new CountDownLatch(2); // CountDownLatch to wait for both tasks to complete

        messageExecutor.execute(() -> {
            try {
                InputStream stream = new ClassPathResource("welcome_fr_CA.properties").getInputStream();
                Properties properties = new Properties();
                properties.load(stream);
                String welcomeMessage = properties.getProperty("welcome");
                messages.add(welcomeMessage); // Add the welcome message to the list
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                latch.countDown(); // Decrease the latch count when the task completes
            }
        });

        messageExecutor.execute(() -> {
            try {
                InputStream stream = new ClassPathResource("welcome_en_US.properties").getInputStream();
                Properties properties = new Properties();
                properties.load(stream);
                String welcomeMessage = properties.getProperty("welcome");
                messages.add(welcomeMessage); // Add the welcome message to the list
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                latch.countDown(); // Decrease the latch count when the task completes
            }
        });

        try {
            latch.await(); // Wait until both tasks complete
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }

        return messages;
    }
}