package pl.lstypka.jevidence.testng.example;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Screenshot;
import pl.lstypka.jevidence.example.testng.ExampleService;

import java.io.File;

import static org.fest.assertions.Assertions.assertThat;



public class ExampleServiceAddTest extends AbstractTest {

    ExampleService service = new ExampleService();

    @Test
    public void shouldAdd4And3() {
        // given
        Integer firstNumber = service.getFirstNumber(4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        Integer sum = service.sum(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(7);
    }

    @Test
    public void shouldAdd0And2() {
        // given
        Integer firstNumber = service.getFirstNumber(0);
        Integer secondNumber = service.getFirstNumber(2);

        // when
        Integer sum = service.sum(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(2);
    }

    @Test
    public void shouldAdd0And0() {
        // given
        Integer firstNumber = service.getFirstNumber(0);
        Integer secondNumber = service.getFirstNumber(0);

        // when
        Integer sum = service.sum(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(0);
    }

    @Test
    public void shouldAddMinu4And3() {
        // given
        Integer firstNumber = service.getFirstNumber(-4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        Integer sum = service.sum(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(-2);
    }

    @Test
    public void shouldAddMinus5And4() {
        // given
        Integer firstNumber = service.getFirstNumber(-5);
        Integer secondNumber = service.getFirstNumber(4);

        // when
        Integer sum = service.sum(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(-2);
    }

    @Test
    public void shouldAttachScreenshot() {
        // given
        Integer firstNumber = service.getFirstNumber(-4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        EvidenceReporter.screenshot(new Screenshot("Wallpaper", new File("F:\\wallpapers\\1.jpg")));

        // then
    }

    @Test
    @Parameters({"x", "y", "sum"})
    public void paramTest(Integer x, Integer y, Integer sum) {
        // given

        // when
        Integer result = service.sum(x, y);

        // then
        assertThat(result).isEqualTo(sum);
    }

}
