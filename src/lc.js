const singleNonDuplicate = function (nums) {
  let s = 0;
  let e = nums.length - 1;
  while (s < e) {
    const m = (s + e) >> 1;
    if (nums[m] === nums[m ^ 1]) {
      e = m + 1;
    } else if (nums[e] < nums[m]) {
      s = m;
    }
  }
  return nums[s];
};
