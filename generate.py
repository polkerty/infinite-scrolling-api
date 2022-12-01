from os import listdir
import uuid
from random import choice
import json

DEPLOY_URL = 'https://infinite-scrolling-api.vercel.app'

LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

titles = ['My wonderful vacation', 'Traveling the world', 'Amazing sunset', 'This was actually taken on Mars',
          'Shot on iPhone 5g!',
          'Missing my cat', 'I drew this', 'Paris', '#influencer #coffee #lifestyle', 'Meh',
          "There are actually a LOT of mosquitoes here",
          '#blessed', 'super weird sky tonight', 'Bucket list unlocked!', 'Living the dream'
          ]


def main():
    data = []

    image_filenames = [f for f in listdir('public/img')]
    for img in image_filenames:
        data.append({
            'id': str(uuid.uuid4()),
            'url': f'{DEPLOY_URL}/img/{img}',
            'description': LOREM_IPSUM,
            'title': choice(titles),

        })

    with open('pages/api/data.json', 'w') as f:
        json.dump(data, f)


if __name__ == '__main__':
    main()
