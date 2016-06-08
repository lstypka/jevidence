package pl.lstypka.jevidence.example.testng;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import static org.fest.assertions.Assertions.assertThat;

/**
 * Created by Lukasz on 2016-06-08.
 */
public class AddMathServiceTest extends AbstractTest {

    private MathService mathService = new MathService();

    @Test
    @Parameters({"firstNumber", "secondNumber", "sum"})
    public void paramTest(Integer firstNumber, Integer secondNumber, Integer sum) {
        // given

        // when
        Integer result = mathService.sum(firstNumber, secondNumber);

        // then
        assertThat(result).isEqualTo(sum);
    }

    @Test
    public void shouldAddTwoNumbers() {
        // given

        // when
        Integer result = mathService.sum(5, 3);

        // then
        assertThat(result).isEqualTo(8);
    }


    @Test
    public void shouldAddThreeNumbers() {
        // given

        // when
        Integer result = mathService.sum(11, mathService.sum(5, 3));

        // then
        assertThat(result).isEqualTo(19);
    }
}
