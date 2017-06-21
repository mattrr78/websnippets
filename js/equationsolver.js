class EquationSolver  {
    constructor(digitsStr, target) {
        this.digits = digitsStr.split('').map(c => Number(c));
        this.target = target;
        this.OPERATIONS = [new AppendOperation(), new MultiplyOperation(), new AddOperation()];
    }

    solve()  {
        const iterationCount = this.getIterationCount();
        for (let i = 0; i < iterationCount; i++)  {
            const operationsIndices = this.createOperationsIndices(i);
            const answer = this.solveIteration(operationsIndices);
            if (answer === this.target)  {
                return this.generateEquation(operationsIndices);
            }
        }
        return null;
    }

    getIterationCount()  {
        return this.OPERATIONS.length ** this.getOperationsCount();
    }

    getOperationsCount()  {
        return this.digits.length - 1;
    }

    createOperationsIndices(iteration)  {
        return BaseCalculator.createArray(iteration, this.OPERATIONS.length,
            this.getOperationsCount());
    }

    solveIteration(operationsIndices)  {
        let copyDigits = this.digits.slice(0);
        let copyOperationsIndices = operationsIndices.slice(0);
        for (let operationTypeIndex = 0; operationTypeIndex < this.OPERATIONS.length; operationTypeIndex++)  {
            const operation = this.OPERATIONS[operationTypeIndex];
            let operationIndex = 0;
            while (operationIndex < copyOperationsIndices.length)  {
                if (copyOperationsIndices[operationIndex] === operationTypeIndex)  {
                    let left = copyDigits[operationIndex];
                    let right = copyDigits[operationIndex + 1];
                    copyDigits[operationIndex] = operation.execute(left, right);
                    copyOperationsIndices.splice(operationIndex, 1);
                    copyDigits.splice(operationIndex + 1, 1);
                } else  {
                    operationIndex++;
                }
            }
        }
        return copyDigits[0];
    }

    generateEquation(operationsIndices)  {
        let equation = "";
        for (let operationIndex = 0; operationIndex < operationsIndices.length; operationIndex++)  {
            const operation = this.OPERATIONS[operationsIndices[operationIndex]];
            equation += this.digits[operationIndex] + operation.display();
            if (operationIndex === operationsIndices.length - 1)  {
                equation += this.digits[operationsIndices.length];
            }
        }
        return equation;
    }
}

class Operation  {
    execute(left, right)  {
        return NaN;
    }

    display()  {
        return '';
    }
}

class AppendOperation extends Operation {
    execute(left, right)  {
        return Number(String(left) + String(right));
    }
}

class MultiplyOperation extends Operation  {
    execute(left, right)  {
        return left * right;
    }

    display()  {
        return '*';
    }
}

class AddOperation extends Operation  {
    execute(left, right)  {
        return left + right;
    }

    display()  {
        return '+';
    }
}
