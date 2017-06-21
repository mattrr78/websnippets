class BaseCalculator  {
    static createArray(value, base, arraySize)  {
        let array = new Array(arraySize);
        let position = arraySize - 1;
        let divisor = base ** position;
        while (position >= 0)  {
            array[position] = Math.floor(value / divisor);
            value %= divisor;
            divisor /= base;
            position--;
        }
        return array;
    }
}
