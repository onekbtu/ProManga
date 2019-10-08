import requests
from bs4 import BeautifulSoup


def images_from_lhscan_chapter(url: str) -> ():
    page = requests.get(url)
    content = BeautifulSoup(page.content, 'html.parser')
    images = content.find_all(
        'img',
        {'class': 'chapter-img'}
    )
    return (image['data-src'].strip('\n') for image in images)


def images_from_mangarock_chapter(url: str) -> ():
    chapter_oid = url.split(sep='/')[-1]
    mri_decoder_url = 'https://mri-image-decoder.now.sh/?url='
    mangarock_api_url = 'https://api.mangarockhd.com/query/web401/pagesv2?country=Kazakhstan&oid='
    response = requests.get(
        f'{mangarock_api_url}{chapter_oid}'
    )
    response.raise_for_status()
    images = response.json().get('data', ())
    return (f'{mri_decoder_url}{image.get("url", "")}' for image in images)


def lambda_handler(event, context):
    return {
        'images_from_mangarock_chapter': tuple(
            images_from_mangarock_chapter(url=event['mangarock_chapter_url'])
        ),
        'images_from_lhscan_chapter': tuple(
            images_from_lhscan_chapter(url=event['lhscan_chapter_url'])
        )
    }

