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
package pl.lstypka.jevidence.example.testng;

import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Step;

public class MathService
{
	private static final Logger LOGGER = Logger.getLogger(MathService.class.getName());

	public Integer sum(Integer firstNumber, Integer secondNumber) {
		LOGGER.log(Level.INFO, String.format("LOGGER : Adding %d + %d ", firstNumber, secondNumber));
		randomSleep();
		return firstNumber + secondNumber;
	}

	public Integer substract(Integer firstNumber, Integer secondNumber) {
		LOGGER.log(Level.INFO, String.format("LOGGER : Substracting %d - %d ", firstNumber, secondNumber));
		randomSleep();
		return firstNumber - secondNumber;
	}

	private void randomSleep() {
		try {
			Thread.sleep(new Random().nextInt(200));
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
