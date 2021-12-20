import { testNaN } from "../util/testNaN";

export const BasicOperators = {
  /**
   * Get the collective sum of all the numbers provided.
   *
   * @param numbers - a number or an array of numbers
   * @returns {number} The sum of all the numbers provided
   */
  sum(...numbers: (number | number[])[]): number {
    let result = 0;
    let flatNumbers = numbers.flatMap((n) => n);

    testNaN(numbers);

    flatNumbers.map((n) => {
      if (typeof n == "number") return (result = result + n);
    });

    return result;
  },

  /**
   * Add a number to a number or set of numbers.
   * 
   * This method will take a number or set of numbers and add the second argument to each.
   * It will return the result of the addition.
   * 
   * @param numbers - a number or an array of numbers
   * @param add - the number to add to each number
   * @returns {number | number[]} The sum of all the numbers provided
   */
  sumFrom(numbers: number | number[], add: number): number | number[] {
    testNaN([numbers]);
    testNaN([add]);

    if (typeof numbers == "number") return numbers + add;
    return numbers.map(n => n + add);
  },

  /**
   * Subtraction a set of numbers in sequence.
   * 
   * This method will take a single number or set of numbers and subtract them in sequence.
   * The result will be the difference of the first number minus the second number, minus the third number, etc.
   *
   * @param numbers - a number or an array of numbers
   * @returns {number} The subtraction of all the numbers provided
   */
  subtract(...numbers: (number | number[])[]): number {
    let flatNumbers = numbers.flatMap((n) => n);

    testNaN(numbers);

    return flatNumbers.reduce((a, b) => a - b);
  },

  /**
   * Subtract a number from a set of numbers.
   * 
   * This method will take a single number or set of numbers and subtract the second argument.
   * The result will be a number or set of numbers that are the difference of the first number(s) minus the second argument.
   *
   * @param numbers - a number or an array of numbers
   * @returns {number | number[]} The subtraction of all the numbers provided
   */
  subtractBy(numbers: number | number[], sub: number): number | number[] {
    testNaN([numbers]);
    testNaN([sub]);

    if (typeof numbers == "number") return numbers - sub;
    else return numbers.map((n) => n - sub);
  },

  /**
   * Multiply a set of numbers in sequential order
   *
   * This method will take all the number provided and multiply them together.  In this method brackets
   * will act like parentheses where the numbers inside will be multiplied together before being executed.
   * This follows the order of PEMDAS.
   *
   * @param numbers - The numbers that you will be multiplying together
   * @returns {number} The product of the numbers provided
   */
  multiply(...numbers: (number | (number | number[]))[]): number {
    let product: number = 0;
    let arrFinal: number[] = [];
    let calculationStarted = false;

    testNaN(numbers);

    numbers.map((n) => {
      if (typeof n == "number") return arrFinal.push(n);
      if (n instanceof Array)
        return arrFinal.push(BasicOperators.multiply(...n));
    });

    arrFinal.map((n) => {
      if (product == 0 && !calculationStarted) product = n;
      if (!calculationStarted) return (calculationStarted = true);
      return (product = product * n);
    });

    return product;
  },

  /**
   * Multiply a number, or set of numbers by another number.
   *
   * If provided with with a single number, this method will take that number and multiply it by the
   * multiplier, if it is passed an object, it will multiply each number in that object by the multiplier
   * and return the updated object with all the values that have been multiplied.
   *
   * @param numbers - The number or numbers that you want multiplied
   * @param multiplier - The number your multiplying by.
   *
   * @returns {number | number[]} The resulting number or set of numbers
   */
  multiplyBy(
    numbers: number | number[],
    multiplier: number
  ): number | number[] {
    testNaN([numbers]);
    testNaN([multiplier]);

    if (typeof numbers == "number") return numbers * multiplier;
    else return numbers.map((n) => n * multiplier);
  },

  /**
   * Divide a set of numbers in sequential order
   *
   * This method will take all of the numbers provided and divde them sequentially.  In this method, brackets
   * will act like parentheses where the numbers inside will be divided prior to the rest of the rest.  This
   * follows the order of PEMDAS.
   *
   * @example ```ts
   * divide(10, 1); // This is 10
   * divide(1, 10); // This is 0.1
   *
   * divide(10, [1000, 10]); // This is 0.1
   * divide([1000, 10], 10); // This is 10
   * ```
   *
   * @param numbers - The numbers that you will be dividng together
   * @returns {number} The quotient of the divided numbers
   */
  divide(...numbers: (number | number[])[]): number {
    let quotient: number = 0;
    let arrFinal: number[] = [];
    let calculationStarted = false;

    testNaN(numbers);

    numbers.map((n) => {
      if (typeof n == "number") return arrFinal.push(n);
      if (n instanceof Array) return arrFinal.push(BasicOperators.divide(...n));
    });

    arrFinal.map((n) => {
      if (quotient == 0 && !calculationStarted) quotient = n;
      if (!calculationStarted) return (calculationStarted = true);
      return (quotient = quotient / n);
    });

    return quotient;
  },

  /**
   * Divide a set of numbers by a single divisor
   *
   * This method will take a single number or set of numbers and divide it by one single number and the result
   * will be either an array of quotents, or a single quotent based on weather you put in a single dividend or
   * an array of dividend's
   *
   * ## Key Word Definitions
   * - **Dividend** - The number being divided and/or distributed (Top number of a fraction)
   * - **Divisor** - The number the is being divided by. (Bottom number of a fraction)
   *
   * @param numbers - Your set of dividends
   * @param divisor - The divisor you want to divide the dividends by.
   * @returns {number | number[]} An array of quotents equal to all of your dividends divided by your divisors
   */
  divideBy(numbers: number | number[], divisor: number): number | number[] {
    testNaN([numbers]);
    testNaN([divisor]);

    if (typeof numbers == "number") return numbers / divisor;
    else return numbers.map((n) => n / divisor);
  },

  /**
   * Raise numbers to the power of the next number in the sequence
   * 
   * This method will take a single number or set of numbers and raise them to the power of the next number in the sequence.
   * It returns the result of this operation as a single number.
   * 
   * @param numbers The numbers to raise to each other sequentially
   * @returns {number} The result of raising each number to the next number in the sequence
   */
  riseSeq(...numbers: (number | number[])[]): number {
    testNaN(numbers);

    let flatMap = numbers.flatMap((n) => n);
    return flatMap.reduce((a, b) => a ** b);
  },

  /**
   * Raise a number or set of numbers to an exponent
   * 
   * This method will take a single number or set of numbers and raise them to the power of the exponent provided.
   * It returns the result of this operation as a number or set of numbers depending on the input.
   * 
   * @param numbers The numbers to raise to the exponent
   * @param exponent The exponent to raise the numbers to
   * @returns {number | number[]} A number or set of numbers raised to the exponent
   */
  riseTo(numbers: number | number[], exponent: number): number | number[] {
    testNaN([numbers]);
    testNaN([exponent]);

    if (typeof numbers == "number") return numbers ** exponent;
    return numbers.map((n) => n ** exponent);
  }
};
