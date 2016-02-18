using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections;

[RequireComponent(typeof(MeshCollider))]

public class Transformable : MonoBehaviour
{
    public static TransformMode MODE = TransformMode.Translate;
    private static StateManager stateManager;

    const string NAME_ROTATE = "rotate";
    const string NAME_TRANSLATE = "translate";
    const string NAME_SCALE = "scale";

    private Vector3 screenPoint;
    private Vector3 offset;
    private GameObject container;

    public static void SetTransformMode(string val)
    {
        switch (val)
        {
            case NAME_TRANSLATE:
                MODE = TransformMode.Translate;
                break;
            case NAME_ROTATE:
                MODE = TransformMode.Rotate;
                break;
            default:
                MODE = TransformMode.Scale;
                break;

        }

        stateManager.GetActiveGameObject().GetComponent<Transformable>().initializeObjects();
    }

    public void destroyElements()
    {
        if (container != null)
        {
            Destroy(container);
        }
    }

    public void initializeObjects()
    {
        GameObject x, y, z;
        float pad = 1.0f;
        Vector3[] bounds = calculateBound();
        Vector3 radius = bounds[0];
        Vector3 center = bounds[1];

        Vector3 standardX = new Vector3(center.x + radius.x + pad, center.y, center.z);
        Vector3 standardY = new Vector3(center.x, center.y + radius.y + pad, center.z);
        Vector3 standardZ = new Vector3(center.x, center.y, center.z + radius.z + pad);
        AbstractTransformHandler xHandler, yHandler, zHandler;
        PrimitiveType toCreate;
        string namePrefix;

        destroyElements();

        switch (MODE)
        {
            case TransformMode.Translate:
                toCreate = PrimitiveType.Sphere;
                namePrefix = NAME_TRANSLATE;
                break;

            case TransformMode.Rotate:
                toCreate = PrimitiveType.Cylinder;
                namePrefix = NAME_ROTATE;
                break;

            default:
                toCreate = PrimitiveType.Cube;
                namePrefix = NAME_SCALE;
                break;
        }

        container = new GameObject();
        container.transform.position = transform.position;

        x = GameObject.CreatePrimitive(toCreate);
        y = GameObject.CreatePrimitive(toCreate);
        z = GameObject.CreatePrimitive(toCreate);

        x.name = namePrefix + "X";
        y.name = namePrefix + "Y";
        z.name = namePrefix + "Z";

        x.GetComponent<Renderer>().material.color = Color.red;
        y.GetComponent<Renderer>().material.color = Color.yellow;
        z.GetComponent<Renderer>().material.color = Color.green;

        x.transform.position = standardX;
        y.transform.position = standardY;
        z.transform.position = standardZ;

        x.transform.SetParent(container.transform);
        y.transform.SetParent(container.transform);
        z.transform.SetParent(container.transform);

        switch (MODE)
        {
            case TransformMode.Translate:
                xHandler = x.AddComponent<TranslateHandler>();
                yHandler = y.AddComponent<TranslateHandler>();
                zHandler = z.AddComponent<TranslateHandler>();

                break;

            case TransformMode.Rotate:
                xHandler = x.AddComponent<RotateHandler>();
                yHandler = y.AddComponent<RotateHandler>();
                zHandler = z.AddComponent<RotateHandler>();

                x.transform.Rotate(new Vector3(0, 0, 1), 90, Space.World);
                z.transform.Rotate(new Vector3(1, 0, 0), 90, Space.World);

                break;

            default:
                xHandler = x.AddComponent<ScaleHandler>();
                yHandler = y.AddComponent<ScaleHandler>();
                zHandler = z.AddComponent<ScaleHandler>();

                x.transform.position = center;
                y.transform.position = center;
                z.transform.position = center;

                x.transform.rotation = transform.rotation;
                y.transform.rotation = transform.rotation;
                z.transform.rotation = transform.rotation;

                x.transform.Translate(radius.x, 0, 0, Space.Self);
                y.transform.Translate(0, radius.y, 0, Space.Self);
                z.transform.Translate(0, 0, radius.z, Space.Self);
                break;
        }

        xHandler.myAxis = Axis.X;
        yHandler.myAxis = Axis.Y;
        zHandler.myAxis = Axis.Z;

        xHandler.transformedObject = gameObject;
        yHandler.transformedObject = gameObject;
        zHandler.transformedObject = gameObject;

        GameObject[] transformationElements = new GameObject[] { x, y, z };
        xHandler.transFormationElements = transformationElements;
        yHandler.transFormationElements = transformationElements;
        zHandler.transFormationElements = transformationElements;

    }

    private Vector3[] calculateBound()
    {
        Vector3 highestPoints = new Vector3(-9999999, -9999999, -9999999);
        Vector3 lowestPoints = new Vector3(9999999, 9999999, 9999999);
        Renderer[] renderers = GetComponentsInChildren<Renderer>();
        foreach (Renderer r in renderers)
        {
            float x = r.bounds.max.x;
            float y = r.bounds.max.y;
            float z = r.bounds.max.z;

            if (x > highestPoints.x)
            {
                highestPoints.x = x;
            }
            if (y > highestPoints.y)
            {
                highestPoints.y = y;
            }
            if (z > highestPoints.z)
            {
                highestPoints.z = z;
            }

            x = r.bounds.min.x;
            y = r.bounds.min.y;
            z = r.bounds.min.z;

            if (x < lowestPoints.x)
            {
                lowestPoints.x = x;
            }
            if (y < lowestPoints.y)
            {
                lowestPoints.y = y;
            }
            if (z < lowestPoints.z)
            {
                lowestPoints.z = z;
            }
        }

        Vector3 center = new Vector3((highestPoints.x + lowestPoints.x) / 2, (highestPoints.y + lowestPoints.y) / 2, (highestPoints.z + lowestPoints.z) / 2);
        float radius = Mathf.Sqrt(Mathf.Pow((highestPoints.x - lowestPoints.x) / 2, 2) + Mathf.Pow((highestPoints.y - lowestPoints.y) / 2, 2) + Mathf.Pow((highestPoints.z - lowestPoints.z) / 2, 2));
        Vector3 radiusVector = new Vector3(radius, radius, radius);
        return new Vector3[] { radiusVector, center };
    }

    void OnMouseDown()
    {
        if (EventSystem.current.IsPointerOverGameObject() == false)
        {
            stateManager.SetActiveGameObject(gameObject);
            screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);

            offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
        }

    }

    void OnMouseDrag()
    {
        if (EventSystem.current.IsPointerOverGameObject() == false)
        {
            Vector3 curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
            Vector3 curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;
            transform.position = curPosition;
            container.transform.position = curPosition;
        }

    }

    void Awake()
    {
        GameObject controlScripts = GameObject.FindGameObjectWithTag("ControlScripts");
        stateManager = controlScripts.GetComponent<StateManager>();
    }


}
