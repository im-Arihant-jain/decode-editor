#include<bits/stdc++.h>
#include<iostream>
using namespace std;

const int MOD = 1e9 + 7;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; ++i) {
            cin >> a[i];
        }

        // Calculate max subarray sum
        int max_so_far = INT_MIN, max_ending_here = 0;
        for (int i = 0; i < n; i++) {
            max_ending_here = max_ending_here + a[i];
            if (max_so_far < max_ending_here)
                max_so_far = max_ending_here;

            if (max_ending_here < 0)
                max_ending_here = 0;
        }

        // Calculate pow(2, k) modulo 10^9 + 7
        int pow_2_k = 1;
        for (int i = 0; i < k; ++i) {
            pow_2_k = (pow_2_k * 2) % MOD;
        }

        // Calculate ans = max_ending_here * (pow(2, k) - 1) modulo 10^9 + 7
        long long ans = (1LL * max_ending_here * (pow_2_k - 1)) % MOD;

        // Calculate the sum of the array
        int sum = (accumulate(a.begin(), a.end(), 0))%MOD;

        // Calculate leftout sum
        int leftout = sum - max_so_far;

        // Calculate final answer modulo 10^9 + 7
        int finalans = (ans + sum) % MOD;

        cout << finalans << endl;
    }
    return 0;
}
