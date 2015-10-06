using UnityEngine;
using System.Collections;

public class CameraProperties {

    public const int POSITION_X = 0;
    public const int POSITION_Y = 1;
    public const int POSITION_Z = 2;
    public const int QUATERNION_ROTATION_X = 3;
    public const int QUATERNION_ROTATION_Y = 4;
    public const int QUATERNION_ROTATION_Z = 5;
    public const int QUATERNION_ROTATION_W = 6;
    public const int EULER_ROTATION_X = 7;
    public const int EULER_ROTATION_Y = 8;
    public const int EULER_ROTATION_Z = 9;

    public static float fget(int option)
    {
        switch (option)
        {
            case POSITION_X: return Camera.main.transform.position.x;
            case POSITION_Y: return Camera.main.transform.position.y;
            case POSITION_Z: return Camera.main.transform.position.z;
            case QUATERNION_ROTATION_X: return Camera.main.transform.rotation.x;
            case QUATERNION_ROTATION_Y: return Camera.main.transform.rotation.y;
            case QUATERNION_ROTATION_Z: return Camera.main.transform.rotation.z;
            case QUATERNION_ROTATION_W: return Camera.main.transform.rotation.w;
            case EULER_ROTATION_X: return Camera.main.transform.rotation.eulerAngles.x;
            case EULER_ROTATION_Y: return Camera.main.transform.rotation.eulerAngles.y;
            case EULER_ROTATION_Z: return Camera.main.transform.rotation.eulerAngles.z;
        }
        return 0f;
    }
}
