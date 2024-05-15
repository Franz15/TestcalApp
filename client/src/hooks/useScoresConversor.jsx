export default function useScoresConversor (percent) {
    const val = Math.round(percent);
    let value;
    if (val >= 200){
        value = 20;
        return value;
    } else if (val >= 1) {
        value = Math.round(val * 0.1);
        return value
    } else {
        value = 1;
        return value;
    }
}
export function useScoresConversorTry (percent) {
    console.log (percent)
    const val = Math.round(percent);
    let value;
    if (val >= 200){
        value = 20;
        return value;
    } else if (val >= 190) {
        value =19;
        return value

    } else if (val >= 180) {
        value =18;
        return value
    } else if (val >= 170) {
        value =17;
        return value
    } else if (val >= 160) {
        value =16;
        return value
    } else if (val >= 150) {
        value =15;
        return value
    } else if (val >= 140) {
        value =14;
        return value
    } else if (val >= 130) {
        value =13;
        return value
    } else if (val >= 120) {
        value =12;
        return value
    } else if (val >= 110) {
        value =11;
        return value
    } else if (val >= 100) {
        value =10;
        return value
    } 
    else if (val >= 90) {
        value = 9;
        return value
    } else if (val >= 80) {
        value =8;
        return value
    } else if (val >= 70) {
        value =7;
        return value
    } else if (val >= 60) {
        value =6;
        return value
    } else if (val >= 50) {
        value =5;
        return value
    } else if (val >= 10) {
        value =4;
        return value
    } else if (val >= 30) {
        value =3;
        return value
    } else if (val >= 10) {
        value =2;
        return value
    } else if (val >= 10) {
        value =1;
        return value
    } else if (val >= 100) {
        value =1;
        return value
    } else {
        value = 1;
        return value;
    }
}

export function useScoresConversorInverted (percent) {
    const val = Math.round(percent);
    let value;
    if (val >= 200){
        value = 1;
        return value;
    } else if (val >= 1) {
        value = Math.round(val * 0.1);
        return value
    } else {
        value = 20;
        return value;
    }
}
