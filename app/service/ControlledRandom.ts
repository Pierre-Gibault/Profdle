export default class ControlledRandom {
  private seed: number;

  constructor() {
    this.seed = parseInt(process.env.randomSeed || "0", 10);
  }

  /**
   * return a random number between 0 and 1 based on a value and a seed.
   * @param n the value to be used in the random number generation
   * @returns a random number between 0 and 1 based on the value and the seed
   */
  seededRandom(n: number): number {
    const x = Math.sin(this.seed * 1000 + n) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Get a random number between min and max, inclusive, based on the current date (day + month + year) and the seed.
   * @param min the minimum value of the range (inclusive)
   * @param max the maximum value of the range (inclusive)
   * @returns a random number between min and max, inclusive rounded to the nearest integer
   */
  mapToRange(min: number, max: number): number {
    const dayMonthYear =
      new Date().getDate() + new Date().getMonth() + new Date().getFullYear();

    return Math.round(min + this.seededRandom(dayMonthYear) * (max - min));
  }
}
