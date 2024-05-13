from urllib.parse import urlencode


def build_parametrized_url(url: str, **params):
    queries = urlencode(params)
    return url + "?" + queries
