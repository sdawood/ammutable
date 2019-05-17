module.exports = [
    [
        "$.sequence",
        [
            "EP1",
            "EP2",
            "EP3"
        ]
    ],
    [
        "$.episodes",
        {
            "EP1": {
                "sequence": [
                    "EP11",
                    "EP12",
                    "EP13"
                ],
                "EP11": {
                    "start": {
                        "place": "EP11-Place",
                        "time": "EP11 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP12": {
                    "start": {
                        "place": "EP12-Place",
                        "time": "EP12 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP13": {
                    "start": {
                        "place": "EP13-Place",
                        "time": "EP13 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                }
            },
            "EP2": {
                "sequence": [
                    "EP21",
                    "EP22",
                    "EP23"
                ],
                "EP21": {
                    "start": {
                        "place": "EP21-Place",
                        "time": "EP21 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP22": {
                    "start": {
                        "place": "EP22-Place",
                        "time": "EP22 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP23": {
                    "start": {
                        "place": "EP23-Place",
                        "time": "EP23 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                }
            },
            "EP3": {
                "sequence": [
                    "EP31",
                    "EP32",
                    "EP33"
                ],
                "EP31": {
                    "start": {
                        "place": "EP31-Place",
                        "time": "EP31 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP32": {
                    "start": {
                        "place": "EP32-Place",
                        "time": "EP32 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                },
                "EP33": {
                    "start": {
                        "place": "EP33-Place",
                        "time": "EP33 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                    }
                }
            }
        }
    ],
    [
        "$.sequence[0]",
        "EP1"
    ],
    [
        "$.sequence[1]",
        "EP2"
    ],
    [
        "$.sequence[2]",
        "EP3"
    ],
    [
        "$.episodes.EP1",
        {
            "sequence": [
                "EP11",
                "EP12",
                "EP13"
            ],
            "EP11": {
                "start": {
                    "place": "EP11-Place",
                    "time": "EP11 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP12": {
                "start": {
                    "place": "EP12-Place",
                    "time": "EP12 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP13": {
                "start": {
                    "place": "EP13-Place",
                    "time": "EP13 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            }
        }
    ],
    [
        "$.episodes.EP2",
        {
            "sequence": [
                "EP21",
                "EP22",
                "EP23"
            ],
            "EP21": {
                "start": {
                    "place": "EP21-Place",
                    "time": "EP21 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP22": {
                "start": {
                    "place": "EP22-Place",
                    "time": "EP22 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP23": {
                "start": {
                    "place": "EP23-Place",
                    "time": "EP23 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            }
        }
    ],
    [
        "$.episodes.EP3",
        {
            "sequence": [
                "EP31",
                "EP32",
                "EP33"
            ],
            "EP31": {
                "start": {
                    "place": "EP31-Place",
                    "time": "EP31 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP32": {
                "start": {
                    "place": "EP32-Place",
                    "time": "EP32 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            },
            "EP33": {
                "start": {
                    "place": "EP33-Place",
                    "time": "EP33 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
                }
            }
        }
    ],
    [
        "$.episodes.EP1.sequence",
        [
            "EP11",
            "EP12",
            "EP13"
        ]
    ],
    [
        "$.episodes.EP1.EP11",
        {
            "start": {
                "place": "EP11-Place",
                "time": "EP11 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP1.EP12",
        {
            "start": {
                "place": "EP12-Place",
                "time": "EP12 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP1.EP13",
        {
            "start": {
                "place": "EP13-Place",
                "time": "EP13 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP1.sequence[0]",
        "EP11"
    ],
    [
        "$.episodes.EP1.sequence[1]",
        "EP12"
    ],
    [
        "$.episodes.EP1.sequence[2]",
        "EP13"
    ],
    [
        "$.episodes.EP1.EP11.start",
        {
            "place": "EP11-Place",
            "time": "EP11 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP1.EP11.start.place",
        "EP11-Place"
    ],
    [
        "$.episodes.EP1.EP11.start.time",
        "EP11 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP1.EP12.start",
        {
            "place": "EP12-Place",
            "time": "EP12 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP1.EP12.start.place",
        "EP12-Place"
    ],
    [
        "$.episodes.EP1.EP12.start.time",
        "EP12 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP1.EP13.start",
        {
            "place": "EP13-Place",
            "time": "EP13 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP1.EP13.start.place",
        "EP13-Place"
    ],
    [
        "$.episodes.EP1.EP13.start.time",
        "EP13 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP2.sequence",
        [
            "EP21",
            "EP22",
            "EP23"
        ]
    ],
    [
        "$.episodes.EP2.EP21",
        {
            "start": {
                "place": "EP21-Place",
                "time": "EP21 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP2.EP22",
        {
            "start": {
                "place": "EP22-Place",
                "time": "EP22 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP2.EP23",
        {
            "start": {
                "place": "EP23-Place",
                "time": "EP23 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP2.sequence[0]",
        "EP21"
    ],
    [
        "$.episodes.EP2.sequence[1]",
        "EP22"
    ],
    [
        "$.episodes.EP2.sequence[2]",
        "EP23"
    ],
    [
        "$.episodes.EP2.EP21.start",
        {
            "place": "EP21-Place",
            "time": "EP21 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP2.EP21.start.place",
        "EP21-Place"
    ],
    [
        "$.episodes.EP2.EP21.start.time",
        "EP21 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP2.EP22.start",
        {
            "place": "EP22-Place",
            "time": "EP22 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP2.EP22.start.place",
        "EP22-Place"
    ],
    [
        "$.episodes.EP2.EP22.start.time",
        "EP22 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP2.EP23.start",
        {
            "place": "EP23-Place",
            "time": "EP23 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP2.EP23.start.place",
        "EP23-Place"
    ],
    [
        "$.episodes.EP2.EP23.start.time",
        "EP23 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP3.sequence",
        [
            "EP31",
            "EP32",
            "EP33"
        ]
    ],
    [
        "$.episodes.EP3.EP31",
        {
            "start": {
                "place": "EP31-Place",
                "time": "EP31 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP3.EP32",
        {
            "start": {
                "place": "EP32-Place",
                "time": "EP32 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP3.EP33",
        {
            "start": {
                "place": "EP33-Place",
                "time": "EP33 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
            }
        }
    ],
    [
        "$.episodes.EP3.sequence[0]",
        "EP31"
    ],
    [
        "$.episodes.EP3.sequence[1]",
        "EP32"
    ],
    [
        "$.episodes.EP3.sequence[2]",
        "EP33"
    ],
    [
        "$.episodes.EP3.EP31.start",
        {
            "place": "EP31-Place",
            "time": "EP31 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP3.EP31.start.place",
        "EP31-Place"
    ],
    [
        "$.episodes.EP3.EP31.start.time",
        "EP31 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP3.EP32.start",
        {
            "place": "EP32-Place",
            "time": "EP32 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP3.EP32.start.place",
        "EP32-Place"
    ],
    [
        "$.episodes.EP3.EP32.start.time",
        "EP32 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ],
    [
        "$.episodes.EP3.EP33.start",
        {
            "place": "EP33-Place",
            "time": "EP33 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
        }
    ],
    [
        "$.episodes.EP3.EP33.start.place",
        "EP33-Place"
    ],
    [
        "$.episodes.EP3.EP33.start.time",
        "EP33 @ Wed May 15 2019 23:28:19 GMT+0200 (EET)"
    ]
];
