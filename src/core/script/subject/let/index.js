const expressionR = /let (.*)/u;

// changeable enumeration values `labels`
const Full = 'xFull';
const Partial = 'xPartial';
const Failure = 'xFailure';
// keywords
const Basic = 'Basic';
const Simple = 'Simple';
const Normal = 'Normal';
const Complex = 'Complex';
const Complicated = 'Complicated';

const CompletionStatus = {
    [Basic]: {
        Full,
        Partial,
        Failure
    }
};

const CompletionStatusFor = mode => ({Full, Partial, Complete, Eventual, Failure, PartialFaliure, RetryableFailure, RetryablePartialFailure, Do, Done} = {}) => (
    {
        // We can capture a value as a dict name, we cannot capture a name of a variable as a value though!!!
        [Full]: Full,
        [Partial]: Partial,
        [Complete]: Complete,
        [Eventual]: Eventual,
        [Failure]: Failure,
        [Partial]: PartialFaliure,
        [RetryableFailure]: RetryableFailure,
        [RetryablePartialFailure]: RetryableFailure,
        [Do]: Do,
        [Done]: Done
    });

console.log(CompletionStatus);

console.log(CompletionStatusFor(Basic)((CompletionStatus[Basic])));

// const parse = expression => {
//     expressionR.test(expression)
//         ? {declaration: 'let', name: expressionR.exec(expression)[1], path: name, done: completionStatus.Full}
//         :
//
// };
