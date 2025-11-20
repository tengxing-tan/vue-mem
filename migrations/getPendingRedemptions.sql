SELECT
phoneNo, rewardId, status, redemptions.createdAt
FROM main.redemptions
JOIN main.rewards ON redemptions.rewardId = rewards.id
WHERE status = 0
