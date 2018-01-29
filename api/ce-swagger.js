var spec =

{
  "swagger" : "2.0",
  "info" : {
    "title" : "Controlled English Store (CE Store)",
    "description" : "Controlled English is a form of structured English that allows you to define models of concepts, their properities and relationships, that is both Human and machine readable.  The CE Store is a runtime for Controlled English and is accessible via a REST API.\n",
    "license" : {
      "name" : "Apache 2.0",
      "url" : "http://www.apache.org/licenses/LICENSE-2.0"
    },
    "version" : "1.0.0"
  },
  "basePath" : "/ce-store",
  "schemes" : [ "http", "https" ],
  "consumes" : [ "application/json", "text/plain; charset=utf-8" ],
  "produces" : [ "application/json", "text/plain; charset=utf-8" ],
  "externalDocs" : {
    "description" : "CE Store GitHub Wiki",
    "url" : "https://github.com/ce-store/ce-store/wiki"
  },
  "tags" : [ {
    "name" : "Sentences"
  }, {
    "name" : "Concepts"
  }, {
    "name" : "Instances"
  }, {
    "name" : "Properties"
  }, {
    "name" : "Queries"
  }, {
    "name" : "Rules"
  }, {
    "name" : "Models"
  }, {
    "name" : "Sources"
  }, {
    "name" : "Special Requests"
  }, {
    "name" : "Hudson"
  } ],
  "paths" : {
    "/sentences" : {
      "get" : {
        "tags" : [ "Sentences" ],
        "summary" : "List all sentences",
        "description" : "If both type and validity parameters are specified the result is the logical AND i.e. only sentences that match the type filter as well as the validity filter will be returned\n",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        }, {
          "name" : "type",
          "in" : "query",
          "description" : "Optionally filter by sentence type `model`, `fact`, `pattern`, `rule`, `query`, `annotation` or `command`\n",
          "required" : false,
          "type" : "string",
          "enum" : [ "model", "fact", "pattern", "rule", "query", "annotation", "command" ]
        }, {
          "name" : "validity",
          "in" : "query",
          "description" : "Optionally filter by sentence validity `valid` or `invalid`\n",
          "required" : false,
          "type" : "string",
          "enum" : [ "valid", "invalid" ]
        } ],
        "responses" : {
          "200" : {
            "description" : "List of sentences as JSON array (default) or in Controlled English (text/plain)",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/getSentence"
              }
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Sentences" ],
        "summary" : "Save CE sentences",
        "description" : "Saves the specified CE sentences in the CE Store, and by parsing them generate all derived entities\n",
        "consumes" : [ "text/plain; charset=utf-8" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "CE",
          "description" : "The CE Sentences to save to the store",
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "List of parse sentences as JSON array (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          }
        }
      }
    },
    "/sentences/{id}" : {
      "get" : {
        "tags" : [ "Sentences" ],
        "summary" : "Get details for the sentence",
        "parameters" : [ {
          "name" : "id",
          "in" : "path",
          "required" : true,
          "description" : "The sentence ID",
          "type" : "string"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Sentence details as JSON array (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/getSentence"
            }
          }
        }
      },
      "delete" : {
        "tags" : [ "Sentences" ],
        "summary" : "Delete sentences",
        "description" : "This is a cascade delete. The sentence will be deleted, plus any entities created from it, including:\n* Concepts\n* Properties\n* Instances\n* Rules\n* Queries\n\nThe deletion of the entity occurs if the deletion of the sentence results in no remaining sentence referencing the entity in question\n",
        "parameters" : [ {
          "name" : "id",
          "in" : "path",
          "required" : true,
          "description" : "The sentence ID",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The sentence was not found (text/plain response only)"
          }
        }
      }
    },
    "/sentences/{id}/rationale" : {
      "get" : {
        "tags" : [ "Sentences" ],
        "summary" : "List the rationale",
        "deprecated" : true,
        "description" : "Listed as deprecated as any call results in an empty array being returned\n",
        "parameters" : [ {
          "name" : "id",
          "in" : "path",
          "required" : true,
          "description" : "The sentence ID",
          "type" : "string"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Empty JSON array or plain text not implemented explanation"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all concepts",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of concepts as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/concepts/{concept name}" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "Get details for a concept",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List concept details as JSON (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Concepts" ],
        "summary" : "Delete a concept",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        } ],
        "description" : "This is a cascade delete. All sentences within the concept will be deleted, plus any entities created from those sentences, including:\n* Models\n* Concepts\n* Properties\n* Instances\n* Rules\n* Queries\n\nThe deletion of the entity occurs if the deletion of the sentence(s) results in no remaining sentence referencing the entity in question.\n",
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/children" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all child concepts",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of child concepts as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/children/direct" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all direct child concepts",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of direct child concepts as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/parents" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all parent concepts",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of parent concepts as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/parents/direct" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all direct parent concepts",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of direct parent concepts as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/properties" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all properties",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of properties as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/properties/datatype" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all datatype properties",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of datatype properties as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/properties/object" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all object properties",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        }, {
          "name" : "range",
          "in" : "query",
          "description" : "Restrict the result to only those properties that have the specified range\n",
          "required" : false,
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of object properties as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/instances" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all instances",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Concepts" ],
        "summary" : "Delete all instances",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/instances/frequency" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "Return the frequency of all instances sorted into buckets by time",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "name" : "property",
          "in" : "query",
          "description" : "Sort by the specified property (default is timestamp)\n",
          "required" : false,
          "type" : "string",
          "default" : "timestamp"
        }, {
          "name" : "buckets",
          "in" : "query",
          "description" : "Number of buckets to sort into (default is 10)\n",
          "required" : false,
          "type" : "integer",
          "default" : 10
        } ],
        "responses" : {
          "200" : {
            "description" : "List of instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/instances/count" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "Count all instances",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/instances/exact" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all exact instances",
        "description" : "List only those instance directly asserted to be of this concept rather than any inferred instances from children  \n",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of exact instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Concepts" ],
        "summary" : "Delete exact instances",
        "description" : "Delete only those instance directly asserted to be of this concept rather than any inferred instances from children  \n",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/sentences" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all sentences",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/sentences/primary" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all primary sentences",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of primary sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/sentences/secondary" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List all secondary sentences",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of secondary sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/concepts/{concept name}/rationale" : {
      "get" : {
        "tags" : [ "Concepts" ],
        "summary" : "List the rationale",
        "deprecated" : true,
        "description" : "Listed as deprecated as any call results in an empty array being returned\n",
        "parameters" : [ {
          "$ref" : "#/parameters/conceptName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Empty JSON array or plain text not implemented explanation"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all instances",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of instances as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Instances" ],
        "summary" : "Delete all instances",
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          }
        }
      }
    },
    "/instances/{instance name}" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "Get details for an instance",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Details for the instance as a JSON object (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Instances" ],
        "summary" : "Delete instance",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances/{instance name}/references" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all the instance references",
        "description" : "List all the instances that refer to the specified instance, and the property in which they refer to it\n",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances/{instance name}/sentences" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all sentences for the instance",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances/{instance name}/sentences/primary" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all primary sentences for the instance",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of primary instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances/{instance name}/sentences/secondary" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all secondary sentences for the instance",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of secondary instances as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      }
    },
    "/instances/{instance name}/rationale" : {
      "get" : {
        "tags" : [ "Instances" ],
        "summary" : "List all the rationale",
        "deprecated" : true,
        "description" : "Listed as deprecated as any call results in an empty array being returned\n",
        "parameters" : [ {
          "$ref" : "#/parameters/instanceName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Empty JSON array or plain text not implemented explanation"
          },
          "404" : {
            "description" : "The instance was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all roperties",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of properties as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/properties/datatype" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all datatype properties",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of datatype properties as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/properties/object" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all object properties",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of object properties as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/properties/object/{property range}" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all object properties within a range",
        "parameters" : [ {
          "name" : "property range",
          "in" : "path",
          "required" : true,
          "description" : "Restrict the result to only those properties that have the specified range\n",
          "type" : "string"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of object properties as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/properties/{property name}" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "Get details for the property",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Details for the property as a JSON object (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The property was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties/{property name}/sentences" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all sentences for the propert",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The property was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties/{property name}/sentences/primary" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all primary sentences for the propert",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of primary sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The property was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties/{property name}/sentences/secondary" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List all secondary sentences for the propert",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of secondary sentences as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The property was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties/{property name}/rationale" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "List the rationale",
        "deprecated" : true,
        "description" : "Listed as deprecated as any call results in an empty array being returned\n",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Empty JSON array or plain text not implemented explanation"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/properties/{property name}/common" : {
      "get" : {
        "tags" : [ "Properties" ],
        "summary" : "Count the numbe of times each property value has been used",
        "parameters" : [ {
          "$ref" : "#/parameters/propertyName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of property value and count statistics as JSON array (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The property was not found (text/plain response only)"
          }
        }
      }
    },
    "/queries" : {
      "get" : {
        "tags" : [ "Queries" ],
        "summary" : "List all queries",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of queries as JSON array (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/specialPatternArray"
            }
          }
        }
      }
    },
    "/queries/{query name}" : {
      "get" : {
        "tags" : [ "Queries" ],
        "summary" : "Get details for the query",
        "parameters" : [ {
          "$ref" : "#/parameters/queryName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Details for the query as a JSON object (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/query_or_rule"
            }
          },
          "404" : {
            "description" : "The query was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Queries" ],
        "summary" : "Delete query",
        "parameters" : [ {
          "$ref" : "#/parameters/queryName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The query was not found (text/plain response only)"
          }
        }
      }
    },
    "/queries/{query name}/execute" : {
      "get" : {
        "tags" : [ "Queries" ],
        "summary" : "Show the results of executing query",
        "parameters" : [ {
          "$ref" : "#/parameters/queryName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "A JSON query result (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/query_or_ruleExecution"
            }
          },
          "404" : {
            "description" : "The query was not found (text/plain response only)"
          }
        }
      }
    },
    "/rules" : {
      "get" : {
        "tags" : [ "Rules" ],
        "summary" : "List all rules",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of rules as JSON array (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/rules"
            }
          }
        }
      }
    },
    "/rules/{rule name}" : {
      "get" : {
        "tags" : [ "Rules" ],
        "summary" : "Get details for the rule",
        "parameters" : [ {
          "$ref" : "#/parameters/ruleName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "Details for the rule as a JSON object (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/query_or_rule"
            }
          },
          "404" : {
            "description" : "The rule was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Rules" ],
        "summary" : "Delete rule",
        "parameters" : [ {
          "$ref" : "#/parameters/ruleName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The rule was not found (text/plain response only)"
          }
        }
      }
    },
    "/rules/{rule name}/execute" : {
      "get" : {
        "tags" : [ "Rules" ],
        "summary" : "Execute rule as query",
        "description" : "Show the results of evaluating the rule by executing it as a query\n",
        "parameters" : [ {
          "$ref" : "#/parameters/ruleName"
        } ],
        "responses" : {
          "200" : {
            "description" : "A JSON query result (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/query_or_ruleExecution"
            }
          },
          "404" : {
            "description" : "The rule was not found (text/plain response only)"
          }
        }
      },
      "post" : {
        "tags" : [ "Rules" ],
        "summary" : "Execute rule",
        "description" : "Show the results of evaluating the rule\n",
        "parameters" : [ {
          "$ref" : "#/parameters/ruleName"
        } ],
        "responses" : {
          "200" : {
            "description" : "A JSON query result (default) or in Controlled English (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/ruleExecution"
            }
          },
          "404" : {
            "description" : "The rule was not found (text/plain response only)"
          }
        }
      }
    },
    "/rules/{rule name}/rationale" : {
      "get" : {
        "tags" : [ "Rules" ],
        "summary" : "List the rationale",
        "deprecated" : true,
        "description" : "Listed as deprecated as any call results in an empty array being returned\n",
        "parameters" : [ {
          "$ref" : "#/parameters/ruleName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Empty JSON array or plain text not implemented explanation"
          },
          "404" : {
            "description" : "The concept was not found (text/plain response only)"
          }
        }
      }
    },
    "/models" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "List all models",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of models as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/models/{model name}" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "Get details for a model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List model details as JSON (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The model was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Models" ],
        "summary" : "Delete a model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        } ],
        "description" : "This is a cascade delete. All sentences within the model will be deleted, plus any entities created from those sentences, including:\n* Models\n* Concepts\n* Properties\n* Instances\n* Rules\n* Queries\n\nThe deletion of the entity occurs if the deletion of the sentence(s) results in no remaining sentence referencing the entity in question.\n",
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The model was not found (text/plain response only)"
          }
        }
      }
    },
    "/models/{model name}/sources" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "List all sources that define the model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of all CE sentences for each of the sources that define the model as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/models/{model name}/sentences" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "List all sentences for the model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of all CE sentences as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/models/{model name}/concepts" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "List all concepts that are defined in the model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of all CE sentences for each of the concepts defined in the model as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/models/{model name}/properties" : {
      "get" : {
        "tags" : [ "Models" ],
        "summary" : "List all properties that are defined in the model",
        "parameters" : [ {
          "$ref" : "#/parameters/modelName"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of all CE sentences for each of the properties defined in the model as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/sources" : {
      "get" : {
        "tags" : [ "Sources" ],
        "summary" : "List all sources",
        "parameters" : [ {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of sources as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/sources/{source id}" : {
      "get" : {
        "tags" : [ "Sources" ],
        "summary" : "Get details for the source",
        "parameters" : [ {
          "$ref" : "#/parameters/sourceId"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List source details as JSON (default) or in Controlled English (text/plain)"
          },
          "404" : {
            "description" : "The source was not found (text/plain response only)"
          }
        }
      },
      "delete" : {
        "tags" : [ "Sources" ],
        "summary" : "Delete the source",
        "parameters" : [ {
          "$ref" : "#/parameters/sourceId"
        } ],
        "description" : "This is a cascade delete. All sentences within the source will be deleted, plus any entities created from those sentences, including:\n* Models\n* Concepts\n* Properties\n* Instances\n* Rules\n* Queries\n\nThe deletion of the entity occurs if the deletion of the sentence(s) results in no remaining sentence referencing the entity in question.\n",
        "responses" : {
          "200" : {
            "description" : "Summary of deletion request as JSON (default) or a Controlled English confirmation of the deletion (text/plain)",
            "schema" : {
              "$ref" : "#/definitions/writeResponse"
            }
          },
          "404" : {
            "description" : "The model was not found (text/plain response only)"
          }
        }
      }
    },
    "/sources/{source id}/sentences" : {
      "get" : {
        "tags" : [ "Sources" ],
        "summary" : "List all sentences for the source",
        "parameters" : [ {
          "$ref" : "#/parameters/sourceId"
        }, {
          "$ref" : "#/parameters/style"
        } ],
        "responses" : {
          "200" : {
            "description" : "List of all CE sentences within the source as JSON array (default) or in Controlled English (text/plain)"
          }
        }
      }
    },
    "/special/statistics" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show various statistics about the CE Store",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "A JSON object containing information about this CE Store instance",
            "schema" : {
              "$ref" : "#/definitions/specialStatistics"
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Run garbage collection and then show various statistics about the CE Store",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "A JSON object containing information about this CE Store instance",
            "schema" : {
              "$ref" : "#/definitions/specialStatistics"
            }
          }
        }
      }
    },
    "/special/patterns" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "List all patterns (queries or rules)",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "List of patterns as JSON object",
            "schema" : {
              "$ref" : "#/definitions/specialPatterns"
            }
          }
        }
      }
    },
    "/special/rationale" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "List all rationale details",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "List of rationale as JSON array"
          }
        }
      }
    },
    "/special/config" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show all the configuration details for the CE Store",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "CE Store configuration as JSON object",
            "schema" : {
              "$ref" : "#/definitions/specialConfig"
            }
          }
        }
      }
    },
    "/special/config/{key}" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "List the value for the configuration setting",
        "description" : "Listed as deprecated as any call results in an empty array being returned",
        "deprecated" : true,
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "key",
          "in" : "path",
          "required" : true,
          "description" : "The configuration setting",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "JSON object"
          }
        }
      },
      "put" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Update the value for the configuration setting",
        "description" : "Listed as deprecated as any call results in an empty array being returned",
        "deprecated" : true,
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "key",
          "in" : "path",
          "required" : true,
          "description" : "The configuration setting",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "JSON object"
          }
        }
      }
    },
    "/special/uid" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show the current unique id",
        "description" : "Gets the current unique id that was last used in the CE Store",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "UID as JSON object",
            "schema" : {
              "$ref" : "#/definitions/specialUid"
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Generate and return the next unique id from the CE Store",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "UID as JSON object",
            "schema" : {
              "$ref" : "#/definitions/specialUid"
            }
          }
        }
      }
    },
    "/special/uid/batch" : {
      "post" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Generate a new batch of UIDs from the CE Store",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "size",
          "in" : "query",
          "description" : "The number of unique ids to return in the batch",
          "required" : true,
          "type" : "integer"
        } ],
        "responses" : {
          "200" : {
            "description" : "UID as JSON object",
            "schema" : {
              "type" : "object",
              "properties" : {
                "batch_start" : {
                  "type" : "string"
                },
                "batch_end" : {
                  "type" : "string"
                },
                "batch_size" : {
                  "type" : "integer"
                }
              }
            }
          }
        }
      }
    },
    "/special/keyword-search" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Search the whole CE Store for the specified keywords",
        "parameters" : [ {
          "name" : "keywords",
          "in" : "query",
          "description" : "A space separated list of keywords to search for.  Use double-quotes to surround a string containing spaces",
          "required" : true,
          "type" : "array",
          "collectionFormat" : "ssv",
          "items" : {
            "type" : "string"
          }
        }, {
          "name" : "caseSensitive",
          "in" : "query",
          "description" : "Make the keyword search case sensitive if set to true",
          "type" : "boolean",
          "default" : false
        }, {
          "name" : "restrictToConcepts",
          "in" : "query",
          "description" : "A comma separated list of concept names.  The keyword search will only occur if the instance also matches concepts in this list.  No space before/after comma.  Do not use quotes to surround strings containing spaces.",
          "type" : "array",
          "collectionFormat" : "csv",
          "items" : {
            "type" : "string"
          }
        }, {
          "name" : "restrictToProperties",
          "in" : "query",
          "description" : "A comma separated list of property names.  The keyword search will only occur if the instance also matches concepts in this list.  No space before/after comma.  Do not use quotes to surround strings containing spaces.",
          "type" : "array",
          "collectionFormat" : "csv",
          "items" : {
            "type" : "string"
          }
        } ],
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "A keyword search object",
            "schema" : {
              "type" : "object",
              "properties" : {
                "search_terms" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string"
                  }
                },
                "search_concepts" : {
                  "items" : {
                    "type" : "string"
                  }
                },
                "search_properties" : {
                  "items" : {
                    "type" : "string"
                  }
                },
                "search_results" : {
                  "type" : "object",
                  "properties" : {
                    "concept_names" : {
                      "type" : "array",
                      "items" : {
                        "type" : "string"
                      }
                    },
                    "instance_name" : {
                      "type" : "string"
                    },
                    "instance_label" : {
                      "type" : "string"
                    },
                    "property_name" : {
                      "type" : "string"
                    },
                    "property_value" : {
                      "type" : "string"
                    },
                    "property_type" : {
                      "type" : "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/special/shadow-concepts" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show all shadow concepts",
        "description" : "A shadow concept is one that is referenced but not defined",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "JSON Array",
            "schema" : {
              "type" : "array",
              "items" : {
                "type" : "object"
              }
            }
          }
        }
      }
    },
    "/special/shadow-instances" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show all shadow instances",
        "description" : "A shadow instance is one that is referenced but not defined",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "JSON Array",
            "schema" : {
              "type" : "array",
              "items" : {
                "type" : "object"
              }
            }
          }
        }
      }
    },
    "/special/diverse-concept-instances" : {
      "get" : {
        "tags" : [ "Special Requests" ],
        "summary" : "Show all diverse concept instances",
        "description" : "Diverse concept instance are stated as being concepts which do not have a common non-thing parent",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "JSON Array",
            "schema" : {
              "type" : "array",
              "items" : {
                "type" : "object"
              }
            }
          }
        }
      }
    },
    "/special/hudson/interpreter" : {
      "post" : {
        "tags" : [ "Hudson" ],
        "summary" : "Interpret natural language",
        "description" : "Takes natural language input (the question text) and returns a JSON object that shows the interpretation of that text against the currently loaded CE-store.  The interpretations are comprised of matches within the CE-store against the words or phrases used in the question.  \n\nInterpretations are:\n* Simple: occur when words or phrases in the question text are matched to concepts, properties or instances in the CE-store.\n* Complex: 'higher-level' matches based on a small number of predefined patterns.\n",
        "externalDocs" : {
          "description" : "Hudson API Wiki Page",
          "url" : "https://github.com/ce-store/ce-store/wiki/Hudson-API"
        },
        "consumes" : [ "text/plain; charset=utf-8" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "CE",
          "description" : "The natural language sentence to interpret",
          "schema" : {
            "type" : "string",
            "example" : "who is Jane"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Interpretation in JSON",
            "schema" : {
              "$ref" : "#/definitions/hudsonInterpretation"
            }
          }
        }
      }
    },
    "/special/hudson/answerer" : {
      "post" : {
        "tags" : [ "Hudson" ],
        "summary" : "Answer based on interpretations",
        "description" : "The answerer API takes the interpretation JSON as input and generates a JSON containing the answer(s) that are generated by the default CE Store Hudson answerer.  Additional custom answerers can easily be created outside of the CE Store environment. For example, to provide access to external structured data that is not held in the CE Store, or to provide more bespoke answers than the default CE Store answerer.\n",
        "externalDocs" : {
          "description" : "Hudson API Wiki Page",
          "url" : "https://github.com/ce-store/ce-store/wiki/Hudson-API"
        },
        "consumes" : [ "application/json" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "CE",
          "description" : "The interpreter JSON",
          "schema" : {
            "$ref" : "#/definitions/hudsonInterpretation"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Answers in JSON",
            "schema" : {
              "$ref" : "#/definitions/hudsonAnswer"
            }
          }
        }
      }
    },
    "/special/hudson/executor" : {
      "post" : {
        "tags" : [ "Hudson" ],
        "summary" : "Interpret and answer",
        "description" : "The executor API concatenates the interpreter and answerer such that you can go directly from natural language text input (the question tex) to answer JSON generated by the default CE-store answerer. This is useful in quickly building basic answering systems through a single API invocation but does not allow for the integration of custom answerers, or the integration of multiple answerers against a single interpreter. If you wish to do these more advanced configurations then you simply need to invoke the interpreter and answerer APIs separately.\n",
        "externalDocs" : {
          "description" : "Hudson API Wiki Page",
          "url" : "https://github.com/ce-store/ce-store/wiki/Hudson-API"
        },
        "consumes" : [ "text/plain; charset=utf-8" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "CE",
          "description" : "The CE Sentences to save to the store",
          "schema" : {
            "type" : "string",
            "example" : "who is Jane"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Answers in JSON",
            "schema" : {
              "$ref" : "#/definitions/hudsonAnswer"
            }
          }
        }
      }
    },
    "/special/hudson/helper" : {
      "post" : {
        "tags" : [ "Hudson" ],
        "summary" : "Type ahead suggestions",
        "description" : "This API returns suggested matches within the CE Store for a given natural language text string and is designed to be used as a 'type-ahead' function to propose concepts, properties or instances that are matched within the CE Store as the user types their question text.\n",
        "externalDocs" : {
          "description" : "Hudson API Wiki Page",
          "url" : "https://github.com/ce-store/ce-store/wiki/Hudson-API"
        },
        "consumes" : [ "text/plain; charset=utf-8" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "CE",
          "description" : "The natural language sentence to interpret",
          "schema" : {
            "type" : "string",
            "example" : "who is Jan"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Suggestions in JSON",
            "schema" : {
              "$ref" : "#/definitions/hudsonHelp"
            }
          }
        }
      }
    }
  },
  "parameters" : {
    "style" : {
      "in" : "query",
      "name" : "style",
      "description" : "Optionally format the list in `summary` (default) or `full` form\n",
      "required" : false,
      "type" : "string",
      "default" : "summary",
      "enum" : [ "summary", "full" ]
    },
    "conceptName" : {
      "in" : "path",
      "name" : "concept name",
      "required" : true,
      "description" : "The name of the concept",
      "type" : "string"
    },
    "instanceName" : {
      "in" : "path",
      "name" : "instance name",
      "required" : true,
      "description" : "The name of the instance",
      "type" : "string"
    },
    "propertyName" : {
      "in" : "path",
      "name" : "property name",
      "required" : true,
      "description" : "The name of the property",
      "type" : "string"
    },
    "queryName" : {
      "in" : "path",
      "name" : "query name",
      "required" : true,
      "description" : "The name of the query",
      "type" : "string"
    },
    "ruleName" : {
      "in" : "path",
      "name" : "rule name",
      "required" : true,
      "description" : "The name of the rule",
      "type" : "string"
    },
    "modelName" : {
      "in" : "path",
      "name" : "model name",
      "required" : true,
      "description" : "The name of the model",
      "type" : "string"
    },
    "sourceId" : {
      "in" : "path",
      "name" : "source id",
      "required" : true,
      "description" : "The id of the souce",
      "type" : "string"
    }
  },
  "definitions" : {
    "hudsonInterpretation" : {
      "type" : "object",
      "properties" : {
        "question" : {
          "type" : "object",
          "properties" : {
            "text" : {
              "type" : "string"
            },
            "words" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            }
          }
        },
        "interpretations" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "confidence" : {
                "type" : "integer"
              },
              "result" : {
                "type" : "array",
                "items" : {
                  "type" : "object",
                  "properties" : {
                    "concepts" : {
                      "type" : "object"
                    },
                    "instances" : {
                      "type" : "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "hudsonAnswer" : {
      "type" : "object",
      "properties" : {
        "question" : {
          "type" : "object",
          "properties" : {
            "text" : {
              "type" : "string"
            }
          }
        },
        "answers" : {
          "type" : "array",
          "items" : {
            "type" : "object"
          }
        }
      }
    },
    "hudsonHelp" : {
      "type" : "object",
      "properties" : {
        "suggestions" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "question text" : {
                "type" : "string"
              },
              "after text" : {
                "type" : "string"
              }
            }
          }
        }
      }
    },
    "specialStatistics" : {
      "type" : "object",
      "properties" : {
        "alerts" : {
          "type" : "object",
          "properties" : {
            "debugs" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            },
            "infos" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            },
            "warnings" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            },
            "errors" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            }
          }
        },
        "message" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        },
        "stats" : {
          "type" : "object",
          "properties" : {
            "code_version" : {
              "type" : "string"
            },
            "server_time" : {
              "type" : "string"
            },
            "duration" : {
              "type" : "string"
            },
            "sentence_count" : {
              "type" : "string"
            },
            "instance_count" : {
              "type" : "string"
            }
          }
        }
      }
    },
    "specialPatternArray" : {
      "type" : "array",
      "items" : {
        "type" : "object",
        "properties" : {
          "qr_type" : {
            "type" : "string"
          },
          "query_name" : {
            "type" : "string"
          },
          "query_time" : {
            "type" : "string"
          },
          "ce" : {
            "type" : "string"
          }
        }
      }
    },
    "specialPatterns" : {
      "type" : "object",
      "properties" : {
        "queries" : {
          "$ref" : "#/definitions/specialPatternArray"
        },
        "rules" : {
          "$ref" : "#/definitions/specialPatternArray"
        }
      }
    },
    "specialConfig" : {
      "type" : "object",
      "properties" : {
        "store_properties" : {
          "type" : "object",
          "properties" : {
            "debug" : {
              "type" : "string"
            },
            "cache CE text" : {
              "type" : "string"
            },
            "case sensitive" : {
              "type" : "string"
            },
            "save sentences" : {
              "type" : "string"
            },
            "autorun rules" : {
              "type" : "string"
            },
            "root folder" : {
              "type" : "string"
            },
            "generated path" : {
              "type" : "string"
            },
            "default CE root" : {
              "type" : "string"
            },
            "default CE current" : {
              "type" : "string"
            },
            "model directory url" : {
              "type" : "string"
            }
          }
        }
      }
    },
    "specialUid" : {
      "type" : "object",
      "properties" : {
        "value" : {
          "type" : "string"
        }
      }
    },
    "getSentence" : {
      "type" : "object",
      "properties" : {
        "_type" : {
          "type" : "string"
        },
        "_style" : {
          "type" : "string"
        },
        "_id" : {
          "type" : "string"
        },
        "_created" : {
          "type" : "integer"
        },
        "sen_type" : {
          "type" : "string"
        },
        "validity" : {
          "type" : "string"
        },
        "ce_text" : {
          "type" : "string"
        },
        "ce_structured_text" : {
          "type" : "array",
          "items" : {
            "type" : "object"
          }
        },
        "source_id" : {
          "type" : "string"
        }
      }
    },
    "writeResponse" : {
      "allOf" : [ {
        "$ref" : "#/definitions/specialStatistics"
      }, {
        "type" : "object",
        "properties" : {
          "structured_response" : {
            "type" : "object",
            "properties" : {
              "invalid_sentences" : {
                "type" : "integer"
              },
              "command_count" : {
                "type" : "integer"
              },
              "valid_sentences" : {
                "type" : "integer"
              },
              "execution_time" : {
                "type" : "integer"
              }
            }
          }
        }
      } ]
    },
    "query_or_rule" : {
      "type" : "object",
      "properties" : {
        "_id" : {
          "type" : "string"
        },
        "ce_text" : {
          "type" : "string"
        },
        "concepts" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "variable_id" : {
                "type" : "string"
              },
              "concept_name" : {
                "type" : "string"
              },
              "included" : {
                "type" : "boolean"
              },
              "premise_or_conclusion" : {
                "type" : "string"
              }
            }
          }
        },
        "attributes" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "variable_id" : {
                "type" : "string"
              },
              "source_variable" : {
                "type" : "string"
              },
              "property_name" : {
                "type" : "string"
              },
              "property_format" : {
                "type" : "string"
              },
              "premise_or_conclusion" : {
                "type" : "string"
              },
              "included" : {
                "type" : "boolean"
              },
              "negated_domain" : {
                "type" : "boolean"
              },
              "negated_range" : {
                "type" : "boolean"
              }
            }
          }
        },
        "relationships" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "source_variable" : {
                "type" : "string"
              },
              "target_variable" : {
                "type" : "string"
              },
              "property_name" : {
                "type" : "string"
              },
              "property_format" : {
                "type" : "string"
              },
              "premise_or_conclusion" : {
                "type" : "string"
              },
              "negated_domain" : {
                "type" : "boolean"
              },
              "negated_range" : {
                "type" : "boolean"
              }
            }
          }
        }
      }
    },
    "query_or_ruleExecution" : {
      "type" : "object",
      "properties" : {
        "query" : {
          "type" : "string"
        },
        "query_time" : {
          "type" : "integer"
        },
        "number_of_rows" : {
          "type" : "integer"
        },
        "headers" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        },
        "types" : {
          "items" : {
            "type" : "string"
          }
        },
        "results" : {
          "type" : "array",
          "items" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            }
          }
        }
      }
    },
    "ruleExecution" : {
      "allOf" : [ {
        "$ref" : "#/definitions/specialStatistics"
      }, {
        "type" : "object",
        "properties" : {
          "structured_response" : {
            "$ref" : "#/definitions/query_or_ruleExecution"
          }
        }
      } ]
    },
    "rules" : {
      "type" : "array",
      "items" : {
        "type" : "object",
        "properties" : {
          "qr_type" : {
            "type" : "string"
          },
          "rule_name" : {
            "type" : "string"
          },
          "rule_time" : {
            "type" : "string"
          },
          "ce" : {
            "type" : "string"
          }
        }
      }
    }
  }
}
