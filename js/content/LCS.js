/**
 * calculate Longest Common Subsequence of A & B, and return LCS(A/B) / min(|A|, |B|)
 * 
 * @param {String} A 
 * @param {String} B 
 * @returns {number} similarity 
 */
function LCS(A, B) {
    const m = A.length,
        n = B.length
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
    for (let i = 1; i <= m; ++i)
        for (let j = 1; j <= n; ++j)
            if (A[i - 1] == B[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    // console.log(A)
    // console.log(B)
    // console.log(`similarity:  ${dp[m][n] / Math.min(m, n)}`)
    return dp[m][n] / Math.min(m, n)
}