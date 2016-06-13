package pl.lstypka.jevidence.example.testng;


import org.junit.Ignore;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

/**
 * Created by Lukasz on 2016-06-08.
 */
public class AddMathServiceTest extends AbstractTest {

    private MathService mathService = new MathService();

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
