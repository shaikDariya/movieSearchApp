export const sortByField = (list: any[], field: string): any[] => {
  return list.slice().sort((f: any, s: any) => {
    const fField = f[field];
    const sField = s[field];
    if (fField > sField) {
      return 1;
    }

    if (fField < sField) {
      return -1;
    }
    return 0;
  });
};
