using UnityEngine;
using System.Collections;

public class Database {

    private const string JSON_PATH = "JSON/";
    private const string PREFAB_PATH = "PREFAB/";
    
    public static string readIngredient(string objectName)
    {
        TextAsset ta = (TextAsset)Resources.Load(JSON_PATH + objectName);
        return ta.text;
    }

    public static GameObject readPrefab()
    {
        return null;
    }

}

