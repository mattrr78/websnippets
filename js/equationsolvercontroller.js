class EquationSolverController  {
    static clearAnswer(event)  {
        $('#spnAnswer').html('');
    }

    static handle(event)  {
        const digits = $('#txtDigits').val();
        const target = Number($('#txtTarget').val());
        const solver = new EquationSolver(digits, target);
        let answer = solver.solve();
        if (!answer)  {
            answer = 'No solution found';
        }
        $('#spnAnswer').html(answer);
    }
}
