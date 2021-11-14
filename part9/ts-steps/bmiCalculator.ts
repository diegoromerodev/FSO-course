interface BmiData {
    height: number,
    weight: number
}

const processArgs = (args: Array<string>): BmiData => {
    if(args.length < 4){
        throw new Error("not enough data");
    }
    else if(args.length > 4){
        throw new Error("too much data");
    }
    
    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
};

export const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    if (bmi > 29.9) {
        return "Obese (go to the gym)";
    } else if (bmi > 25.0) {
        return "Overweight (stop eating)";
    } else if (bmi > 18.5) {
        return "Healthy and normal (nice!)";
    } else {
        return "You are underweight (eat!)";
    }
};

try {
    const {height, weight} = processArgs(process.argv);
    bmiCalculator(height, weight);
} catch (err: unknown) {
    let errorMsg = "Something went wrong";
    if(err instanceof Error) {
        errorMsg += err.message;
    }
    console.log(errorMsg);
}