import os
import random
import requests

def get_contributors(repo):
    """ 저장소의 기여자 목록을 가져옵니다. """
    contributors_url = f"https://api.github.com/repos/{repo}/contributors"
    headers = {"Authorization": f"token {os.getenv('GITHUB_TOKEN')}"}
    response = requests.get(contributors_url, headers=headers)
    return [contributor['login'] for contributor in response.json()]

def assign_reviewer(repo, pr_number, reviewer):
    """ Pull Request에 리뷰어를 할당합니다. """
    review_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/requested_reviewers"
    headers = {
        "Authorization": f"token {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github.v3+json"
    }
    data = {"reviewers": [reviewer]}
    response = requests.post(review_url, headers=headers, json=data)
    print(response.status_code, response.json())

def main():
    repo = os.getenv('GITHUB_REPOSITORY')
    pr_number = os.getenv('GITHUB_EVENT_PATH').split('/')[-1].strip()
    contributors = get_contributors(repo)
    if contributors:
        selected_reviewer = random.choice(contributors)
        assign_reviewer(repo, pr_number, selected_reviewer)
    else:
        print("No contributors found.")

if __name__ == "__main__":
    main()
