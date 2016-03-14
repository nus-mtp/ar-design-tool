using UnityEngine;
using System.Collections;

public class OrbitCamera : MonoBehaviour
{
    private Vector3 lookAtPoint = Vector3.zero;
    private Vector3 mouseOrigin;
    private bool pauseCamera;

    public float angleDrag;

    void Start()
    {
        mouseOrigin = Mouse.mousePosition;
        pauseCamera = false;
        transform.LookAt(lookAtPoint);
    }

    void Update()
    {
        if (Mouse.isMouseDown && !pauseCamera)
        {
            Vector2 d = Mouse.mousePosition - mouseOrigin;
            transform.RotateAround(lookAtPoint, (new Vector2(0, d.x)).normalized, angleDrag * Mathf.Sqrt(d.x*d.x));
        }
        mouseOrigin = Mouse.mousePosition;
    }

    public void pause()
    {
        pauseCamera = true;
    }

    public void resume()
    {
        pauseCamera = false;
    }
}
