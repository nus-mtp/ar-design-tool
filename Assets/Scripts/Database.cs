using UnityEngine;
using System.Collections;

public class Database {

    private const string JSON_PATH = "JSON/";
    private const string PREFAB_PATH = "Prefabs/";
    private const string IMAGERESOURCE_PATH = "ImageResources/";

    public static string readJSON(string objectName)
    {
        TextAsset ta = (TextAsset)Resources.Load(JSON_PATH + objectName);
        return ta.text;
    }

    public static GameObject loadPrefab(string prefabName)
    {
        GameObject go = Resources.Load(PREFAB_PATH + prefabName, typeof(GameObject)) as GameObject;
        return go;
    }

    public static Texture readImage(string imageLocation)
    {
        Texture image = (Texture)Resources.Load(IMAGERESOURCE_PATH + imageLocation);
        return image;
    }

}

