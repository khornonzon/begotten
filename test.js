const usersCount = 3;

const usersPayments = [
    {
        payments: [100]
    },
    {
        payments: [50]
    },
    {
        payments: [25]
    }
]

const debtsByPayments = {

}

usersPayments.forEach(({payments}, currentUserIndex) => {
    payments.forEach(paymentSum => {
        usersPayments.forEach((value, userToDebtIndex) => {
            if (currentUserIndex !== userToDebtIndex) {
                if (debtsByPayments[userToDebtIndex]) {
                    debtsByPayments[userToDebtIndex][currentUserIndex] = paymentSum / usersCount;
                } else {
                    debtsByPayments[userToDebtIndex] = {
                            [currentUserIndex]: paymentSum / usersCount
                    }
                }
            }
        })
    })
})

Object.keys(debtsByPayments).forEach(currentUser => {
    const value = debtsByPayments[currentUser];

    Object.keys(value).forEach(userToDebt => {
        const debt = value[userToDebt];
        if (debtsByPayments[userToDebt]) {
            if (debtsByPayments[userToDebt][currentUser]) {
                if (debt > debtsByPayments[userToDebt][currentUser]) {
                    console.log(value[userToDebt])
                    value[userToDebt] = debt - debtsByPayments[userToDebt][currentUser];
                    console.log(value[userToDebt])

                    delete debtsByPayments[userToDebt][currentUser];
                } else {
                    debtsByPayments[userToDebt][currentUser] -= debt;
                    delete value[userToDebt];
                }
            } 
        }
    })

    console.log(value, "\n")

})