/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.lstypka.jevidence.testng.example;

import org.testng.annotations.Test;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Screenshot;
import pl.lstypka.jevidence.example.testng.ExampleService;

import java.io.File;

import static org.fest.assertions.Assertions.assertThat;


public class ExampleServiceMultiplyTest extends AbstractTest {

    ExampleService service = new ExampleService();

    @Test
    public void shouldMultiply4And3() {
        // given
        Integer firstNumber = service.getFirstNumber(4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        Integer sum = service.multiply(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(12);
    }

    @Test
    public void shouldMultiply0And2() {
        // given
        Integer firstNumber = service.getFirstNumber(0);
        Integer secondNumber = service.getFirstNumber(2);

        // when
        Integer sum = service.multiply(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(0);
    }

    @Test
    public void shouldMultiply0And0() {
        // given
        Integer firstNumber = service.getFirstNumber(0);
        Integer secondNumber = service.getFirstNumber(0);

        // when
        Integer sum = service.multiply(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(2);
    }

    @Test
    public void shouldMultiplyMinus4And3() {
        // given
        Integer firstNumber = service.getFirstNumber(-4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        Integer sum = service.multiply(firstNumber, secondNumber);

        // then
        assertThat(sum).isEqualTo(-11);
    }

    @Test
    public void shouldAttachScreenshot() {
        // given
        Integer firstNumber = service.getFirstNumber(-4);
        Integer secondNumber = service.getFirstNumber(3);

        // when
        EvidenceReporter.screenshot(new Screenshot("Wallpaper", new File("F:\\wallpapers\\3.jpg")));

        // then
    }

}
