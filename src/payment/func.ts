import { DebtsByPayments, UsersPayment } from "./types";

export const generalCheck = function (usersPayments: UsersPayment[]) {
  const debtsByPayments: DebtsByPayments = {};
  const usersCount = usersPayments.length;
  usersPayments.forEach(({ payment }, currentUserIndex) => {
    usersPayments.forEach((value, userToDebtIndex: number) => {
      if (currentUserIndex !== userToDebtIndex) {
        if (debtsByPayments[userToDebtIndex]) {
          debtsByPayments[userToDebtIndex][currentUserIndex] =
            payment / usersCount;
        } else {
          debtsByPayments[userToDebtIndex] = {
            [currentUserIndex]: payment / usersCount,
          };
        }
      }
    });
  });

  Object.keys(debtsByPayments).forEach((currentUser) => {
    const value = debtsByPayments[currentUser];

    Object.keys(value).forEach((userToDebt) => {
      const debt = value[userToDebt];
      if (debtsByPayments[userToDebt]) {
        if (debtsByPayments[userToDebt][currentUser]) {
          if (debt > debtsByPayments[userToDebt][currentUser]) {
            console.log(value[userToDebt]);
            value[userToDebt] = debt - debtsByPayments[userToDebt][currentUser];
            console.log(value[userToDebt]);

            delete debtsByPayments[userToDebt][currentUser];
          } else {
            debtsByPayments[userToDebt][currentUser] -= debt;
            delete value[userToDebt];
          }
        }
      }
    });

    console.log(value, "\n");
    return value;
  });
};
