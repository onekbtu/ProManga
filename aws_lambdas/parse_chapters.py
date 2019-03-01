import json
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import requests
import re


def parse_chapters_mangarock(url):
    page = requests.get(url)
    content = BeautifulSoup(page.content, 'html.parser')
    chapters_table = content.findAll('table')[1]

    chapters = []
    for a in chapters_table.find_all('a', href=True):
        chapters.append({
            'url': "{}{}".format("https://mangarock.com", a['href']),
            'name': a.text,
        })

    return chapters


def parse_chapters_lhscan(url):
    page = requests.get(url)
    content = BeautifulSoup(page.content, 'html.parser')
    chapters_table = content.findAll('table')[0]

    chapters = []
    for a in chapters_table.find_all('a', href=True):
        chapters.append({
            'url': "{}{}".format("https://lhscan.net/", a['href']),
            'name': a.text,
        })

    return chapters
    

def manga_chapters_union(first_manga_chapters, second_manga_chapters):
    pattern_regex = 'Chapter \d+'

    first_has = {}
    for chapter in first_manga_chapters:
        match = re.search(pattern_regex, chapter['name'])
        if (match):
            first_has[match.group()] = chapter
    
    result = []
    for chapter in second_manga_chapters:
        match = re.search(pattern_regex, chapter['name'])
        if (match and match.group() in first_has):
            result.append({
                'mangarock': first_has[match.group()],
                'lhscan': chapter,
            })
            
    return result

def lambda_handler(event, context):
    mangarock_chapters = parse_chapters_mangarock(event['mangarock_url'])
    lhscan_chapters = parse_chapters_lhscan(event['lhscan_url'])
    
    return manga_chapters_union(mangarock_chapters, lhscan_chapters)
