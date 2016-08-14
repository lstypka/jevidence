package pl.lstypka.jevidence.example.log4j;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import static org.fest.assertions.Assertions.assertThat;

/**
 * Created by Lukasz on 2016-06-08.
 */
public class SubtractMathServiceTest extends AbstractTest {

    private MathService mathService = new MathService();

    @Test
    @Parameters({"firstNumber", "secondNumber", "sum"})
    public void paramTest(Integer firstNumber, Integer secondNumber, Integer sum) {
        // given

        // when
        Integer result = mathService.substract(firstNumber, secondNumber);

        // then
        assertThat(result).isEqualTo(sum);
        throw new NullPointerException();
    }

    @Test
    public void shouldSubtractTwoNumbers() {
        // given

        // when
        Integer result = mathService.substract(5, 3);

        // then
        assertThat(result).isEqualTo(2);
        throw new NullPointerException();
    }


    @Test
    public void shouldSubtractThreeNumbers() {
        // given

        // when
        Integer result = mathService.substract(11, mathService.substract(5, 1));

        // then
        assertThat(result).isEqualTo(7);
    }
}
