const calculateBalances = (expenses, memberIds) => {
    const balances = {};
    memberIds.forEach(id => {
        balances[id.toString()] = 0;
    });
    expenses.forEach((exp)=>{
        const share = exp.amount / exp.splitBetween.length;
        exp.splitBetween.forEach((member)=>{
            balances[member._id.toString()] -= share;
        });
        balances[exp.paidBy._id.toString()] += exp.amount;


    });
    return balances;
};
module.exports = { calculateBalances };