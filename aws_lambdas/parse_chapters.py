from bs4 import BeautifulSoup
import requests
import re


def chapters_from_mangarock(url: str) -> ():
    response = requests.get(url=url)
    response.raise_for_status()
    content = BeautifulSoup(
        response.content,
        'html.parser'
    )
    table = content.find_all(name='table')[1]
    links = table.find_all(name='a', href=True)
    chapters = (
        {
            'url': f'{"https://mangarock.com"}{link.get("href")}',
            'name': link.text
        } for link in links
    )
    return chapters


def chapters_from_lhscan(url: str) -> ():
    response = requests.get(
        url=url
    )
    response.raise_for_status()
    content = BeautifulSoup(
        response.content,
        'html.parser'
    )
    table = content.find_all(name='table')[0]
    links = table.find_all(name='a', href=True)
    chapters = (
        {
            'url': f'{"https://lhscan.net/"}{link.get("href")}',
            'name': link.text
        } for link in links
    )
    return chapters


def united_chapters(mangarock_chapters: (), lhscan_chapters: ()) -> ():
    pattern = r'Chapter \d+'

    first_has = {}
    for chapter in mangarock_chapters:
        match = re.search(pattern, chapter['name'])
        if match is not None:
            first_has[match.group()] = chapter

    result = []
    for chapter in lhscan_chapters:
        match = re.search(pattern, chapter['name'])
        if match is not None and match.group() in first_has:
            result.append(
                {
                    'mangarock': first_has[match.group()],
                    'lhscan': chapter,
                }
            )
    return result


def lambda_handler(event, context):
    return united_chapters(
        mangarock_chapters=chapters_from_mangarock(url=event['mangarock_url']),
        lhscan_chapters=chapters_from_lhscan(url=event['lhscan_url'])
    )
