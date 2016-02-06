using UnityEngine;
using System.Collections;

public class FileLoader
{

    private const string JSON_PATH = "JSON/";
    private const string PREFAB_PATH = "Prefabs/";
    private const string IMAGERESOURCE_PATH = "ImageResources/";
    private const string SPRITERESOURCE_PATH = "SpriteResources/";
    private const string OBJ_PATH = "OBJ/";
    private const string VUFORIA_PATH = "VUFORIA/";

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

    public static GameObject LoadVuforia(string prefabName)
    {
        GameObject go = Resources.Load(VUFORIA_PATH + prefabName, typeof(GameObject)) as GameObject;
        return go;
    }

    public static GameObject loadOBJ(string objName)
    {
        GameObject go = Resources.Load(OBJ_PATH + objName, typeof(GameObject)) as GameObject;
        return go;
    }


    public static Texture2D readImage(string imageLocation)
    {
        Texture2D image = (Texture2D)Resources.Load(IMAGERESOURCE_PATH + imageLocation);
        return image;
    }

    public static Sprite readImageSprite(string imageLocation)
    {
        Sprite image = Resources.Load<Sprite>(SPRITERESOURCE_PATH + imageLocation);
        return image;
    }
}
