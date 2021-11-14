interface WeekAnalysis {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const processInput = (args: Array<string>): Array<number> => {
    if(args.length < 3){
        throw new Error("not training enough data");
    }
    const week: Array<number> = [];
    for(const day of args) {
        if(isNaN(Number(day))) continue;
        week.push(Number(day));
    }
    return week;
};

export const exerciseCalculator = (week: Array<number>, target: number): WeekAnalysis => {
    const average = week.reduce((acc, curr) => acc + curr) / week.length;
    let rating;
    if(average >= target) rating = 3;
    else if(average >= target - 0.5) rating = 2;
    else rating = 1;
    let ratingDescription;
    if(rating === 1) ratingDescription = "Please improve.";
    else if(rating === 2) ratingDescription = "Keep going. You're close";
    else ratingDescription = "Goal achieved! Congrats!";
    return {
        periodLength: week.length,
        trainingDays: week.filter(Boolean).length,
        target,
        average,
        success: target <= average,
        rating,
        ratingDescription
    };
};

try {
    const weekData = processInput(process.argv);
    console.log(exerciseCalculator(weekData, 2));
} catch (err: unknown) {
    let errorMsg = "Something went wrong";
    if(err instanceof Error) {
        errorMsg += err.message;
    }
    console.log(errorMsg);
}